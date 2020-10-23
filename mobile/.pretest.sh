BIN_DIR=./bin/
if [ ! -d "$BIN_DIR" ]; then
    mkdir bin 
    cd bin/ 
    mkdir Exponent.app
    wget https://dpq5q02fu5f55.cloudfront.net/Exponent-2.17.4.tar.gz 
    tar -C Exponent.app -zxf Exponent-2.17.4.tar.gz 
fi
