export GOPATH=~/go 
go install github.com/wailsapp/wails/v2/cmd/wails@latest
export PATH=$PATH:$(go env GOPATH)/bin
source ~/.bashrc
wails version