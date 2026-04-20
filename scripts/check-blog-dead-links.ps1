[CmdletBinding()]
param(
    [string]$BlogDataPath = "src/lib/data/blog.ts",
    [switch]$IncludeBuild = $true
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$blogDataFullPath = Join-Path $repoRoot $BlogDataPath

if (-not (Test-Path $blogDataFullPath)) {
    $altPath = Join-Path $repoRoot "src/lib/data/blogs.ts"
    if (Test-Path $altPath) {
        $blogDataFullPath = $altPath
    }
    else {
        throw "Could not find blog data file. Checked '$BlogDataPath' and 'src/lib/data/blogs.ts'."
    }
}

$lines = Get-Content -Path $blogDataFullPath
$posts = @()
$current = $null

foreach ($line in $lines) {
    $trimmed = $line.Trim()

    if ($trimmed -eq "{") {
        $current = @{}
        continue
    }

    if ($null -ne $current -and ($trimmed -eq "}," -or $trimmed -eq "}")) {
        if ($current.ContainsKey("title") -or $current.ContainsKey("slug") -or $current.ContainsKey("url")) {
            $posts += [PSCustomObject]$current
        }
        $current = $null
        continue
    }

    if ($null -eq $current) {
        continue
    }

    if ($trimmed -match "^(?<key>[A-Za-z_][A-Za-z0-9_]*)\s*:\s*(?<value>.+?)\s*,?$") {
        $key = $Matches["key"]
        $valueRaw = $Matches["value"].Trim()

        if ($valueRaw -match "^'(.*)'$") {
            $value = $Matches[1] -replace "\\'", "'"
        }
        elseif ($valueRaw -match '^"(.*)"$') {
            $value = $Matches[1] -replace '\\"', '"'
        }
        elseif ($valueRaw -match "^[0-9]+$") {
            $value = [int]$valueRaw
        }
        else {
            $value = $valueRaw
        }

        $current[$key] = $value
    }
}

if ($posts.Count -eq 0) {
    throw "No blog posts parsed from '$blogDataFullPath'."
}

function Test-BlogPathExists {
    param(
        [string]$RepoRoot,
        [string]$WebPath,
        [string]$Extension,
        [bool]$IncludeBuildDir,
        [string[]]$BaseFolders = @("static")
    )

    if ([string]::IsNullOrWhiteSpace($WebPath)) {
        return [PSCustomObject]@{
            Exists = $false
            Matches = @()
        }
    }

    $trimmedWebPath = $WebPath.TrimStart("/")
    $normalizedWebPath = if ($Extension -and -not $trimmedWebPath.EndsWith($Extension)) {
        "$trimmedWebPath$Extension"
    }
    else {
        $trimmedWebPath
    }

    $candidates = @()

    foreach ($baseFolder in $BaseFolders) {
        $candidates += (Join-Path $RepoRoot (Join-Path $baseFolder $normalizedWebPath))
    }

    if ($IncludeBuildDir -and -not ($BaseFolders -contains "build")) {
        $candidates += (Join-Path $RepoRoot (Join-Path "build" $normalizedWebPath))
    }

    $matches = @($candidates | Where-Object { Test-Path $_ })

    [PSCustomObject]@{
        Exists = $matches.Count -gt 0
        Matches = $matches
    }
}

$issues = @()

foreach ($post in $posts) {
    $title = [string]$post.title
    $slug = [string]$post.slug
    $url = [string]$post.url
    $markdownPath = if ($post.PSObject.Properties.Name -contains "markdownPath") { [string]$post.markdownPath } else { "" }
    $htmlComponent = if ($post.PSObject.Properties.Name -contains "htmlComponent") { [string]$post.htmlComponent } else { "" }

    if ([string]::IsNullOrWhiteSpace($title)) {
        $title = "<untitled post>"
    }

    if ([string]::IsNullOrWhiteSpace($url)) {
        $issues += [PSCustomObject]@{
            Title = $title
            Field = "url"
            Problem = "Missing url"
            Details = "Each post should define a url."
        }
    }

    if ([string]::IsNullOrWhiteSpace($slug)) {
        $issues += [PSCustomObject]@{
            Title = $title
            Field = "slug"
            Problem = "Missing slug"
            Details = "Each post should define a slug."
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($slug) -and -not [string]::IsNullOrWhiteSpace($url)) {
        $expectedUrl = "/blog/$slug"
        if ($url -ne $expectedUrl) {
            $issues += [PSCustomObject]@{
                Title = $title
                Field = "url"
                Problem = "URL/slug mismatch"
                Details = "Expected '$expectedUrl' from slug, found '$url'."
            }
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($url) -and [string]::IsNullOrWhiteSpace($markdownPath) -and [string]::IsNullOrWhiteSpace($htmlComponent)) {
        $issues += [PSCustomObject]@{
            Title = $title
            Field = "url"
            Problem = "URL has no markdown source"
            Details = "Post defines a url but has no markdownPath to validate source content."
        }
    }

    if ([string]::IsNullOrWhiteSpace($markdownPath) -and [string]::IsNullOrWhiteSpace($htmlComponent)) {
        $issues += [PSCustomObject]@{
            Title = $title
            Field = "markdownPath/htmlComponent"
            Problem = "Missing content source"
            Details = "Post must define markdownPath or htmlComponent."
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($markdownPath)) {
        $markdownCheck = Test-BlogPathExists -RepoRoot $repoRoot -WebPath $markdownPath -Extension "" -IncludeBuildDir $IncludeBuild.IsPresent -BaseFolders @("blog", "static", "build")

        if (-not $markdownCheck.Exists) {
            $issues += [PSCustomObject]@{
                Title = $title
                Field = "markdownPath"
                Problem = "Dead markdown link"
                Details = "Could not find '$markdownPath' in blog/, static/, or build/."
            }
        }
    }
}

if ($issues.Count -eq 0) {
    Write-Host "No dead links found in $BlogDataPath ($($posts.Count) posts checked)." -ForegroundColor Green
    exit 0
}

Write-Host "Found $($issues.Count) issue(s) across $($posts.Count) posts:" -ForegroundColor Yellow
$issues | Sort-Object Title, Field | Format-Table -AutoSize
exit 1
