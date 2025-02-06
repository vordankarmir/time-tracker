package main

import (
	"embed"
	"fmt"
	"math"
	"time"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	configStore, err := NewConfigStore("Time tracker")
	if err != nil {
		fmt.Printf("could not initialize the config store: %v\n", err)
		return
	}

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "Time tracker",
		Width:  500,
		Height: 250,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			configStore,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}

	fmt.Println(time.Tick(math.MaxInt64))
}
