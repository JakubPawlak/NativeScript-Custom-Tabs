import { Component, OnInit } from "@angular/core";
import { isAndroid, screen, ScreenMetrics } from "platform";

import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

@Component({
    selector: "TabsComponent",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {

    tabSelectedIndex: number;

    private _nativeTabsDisabled: boolean = false;
    private _title: string;

    constructor() {
        this.tabSelectedIndex = 0;
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the whole tab
        * navigation layout as a whole.
        *************************************************************/
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
        }
    }

    /* ***********************************************************
    * The "getIconSource" function returns the correct tab icon source
    * depending on whether the app is ran on Android or iOS.
    * You can find all resources in /App_Resources/os
    *************************************************************/
    getIconSource(icon: string): string {
        return isAndroid ? "" : "res://tabIcons/" + icon;
    }

    onTabsLoaded(tabView: TabView) {
        console.log(
            'Tabs loaded. Default tabs bar hidden? ' + this._nativeTabsDisabled
        );
        const screenScale = screen.mainScreen.scale;
        if (!this._nativeTabsDisabled) {
            if (tabView) {
                if (tabView.android) {
                    tabView.android.removeViewAt(0);
                } else {
                    tabView.ios.tabBar.hidden = true;
                    const height = 0;

                    setTimeout(() => {
                        console.log("stack.getMeasuredHeight: " + tabView.getMeasuredHeight());
                        console.log("stack.getMeasuredWidth: " + tabView.getMeasuredWidth());

                        const heightDP = tabView.getMeasuredHeight() / screenScale;
                        const widthDP = tabView.getMeasuredWidth() / screenScale;
                        console.log("heightDP: " + heightDP);
                        console.log("widthDP: " + widthDP);

                    }, 100);


                }
            }
            this._nativeTabsDisabled = true;
        }
    }
}
