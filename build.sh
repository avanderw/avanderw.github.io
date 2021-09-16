#!/usr/bin/env bash

version=v$(date +%Y%m%d%H%M)

md2html() {
    local out=${1%.md}
    local out=${out#./src/}
    local out=./target/compile/$out.html
    cat src/_header.html > $out
    pandoc -f markdown -t html5 $1 >> $out
    cat src/_footer.html >> $out
    echo "  $out"
}
export -f md2html

clean() {
    echo ${FUNCNAME[0]}
    rm -rf ./target/
}

validate() {
    echo ${FUNCNAME[0]}
    mkdir ./target
    mkdir ./target/compile
}

compile() {
    echo ${FUNCNAME[0]}
    sass ./src/index.scss ./target/compile/index.css
    find ./ -iwholename "./src/*.md" -type f -exec sh -c 'md2html "${0%}"' {} \;
}

package() {
    echo ${FUNCNAME[0]}
    7z a ./target/avanderw.github.io.7z ./target/compile/*
}

verify() { 
    echo ${FUNCNAME[0]}
}

install() { 
    echo ${FUNCNAME[0]}
    7z x -y ./target/avanderw.github.io.7z -o./docs
    
    git add .
    git commit -m "$1"
}

deploy() { 
    echo ${FUNCNAME[0]}
    git tag $version
    git push
}

clean
validate
compile
package
if [ "$1" == "verify" ] || [ "$1" == "install" ] || [ "$1" == "deploy" ]; then
    verify
fi
if [ "$1" == "install" ] || [ "$1" == "deploy" ]; then
    if [ -z "$2" ]; then
        echo "ERR: will not install without commit message"
    else
        install "$2"
    fi
fi
if [ "$1" == "deploy" ]; then
    if [ -z "$2" ]; then
        echo "ERR: will not deploy without commit message"
    else
        deploy
    fi
fi