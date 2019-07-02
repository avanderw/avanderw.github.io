function h1 {
param($message)
    $underline = '-' * $message.length
    Write-Host
    Write-Host "$message" -ForegroundColor Yellow
    Write-Host "$underline" -ForegroundColor Yellow

}

function fail {
param($message)
    Write-Host "✘`t" -NoNewline -ForegroundColor Red
    Write-Host $message
}

function pass {
param($message)
    Write-Host "✔`t" -NoNewline -ForegroundColor Green
    Write-Host $message
}

function warn {
param($message)
    Write-Host "❢`t" -NoNewline -ForegroundColor Yellow
    Write-Host $message
}

function info {
param($message)
    Write-Host "`t$message"
}


Export-ModuleMember -Function h1
Export-ModuleMember -Function fail
Export-ModuleMember -Function pass
Export-ModuleMember -Function warn
Export-ModuleMember -Function info