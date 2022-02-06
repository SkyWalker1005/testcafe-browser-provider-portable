/* eslint-disable */
import path from 'path';
import browserTools from 'testcafe-browser-tools';

function getScreenSize () {
    return { width: screen.availWidth, height: screen.availHeight };
}

export default {
    // Multiple browsers support
    isMultiBrowser: true,
    screenSizes: {},

    // Required - must be implemented
    // Browser control
    async openBrowser (id, pageUrl, browserName) {
        var browserInfo = {};

        switch (browserName) {
            case 'firefox':
                browserInfo.path = path.join(process.env.PORTABLE_BROWSERS_PATH, 'Mozilla Firefox/firefox.exe');
                browserInfo.cmd  = '-new-window';
                break;
            case 'chrome':
                browserInfo.path = path.join(process.env.PORTABLE_BROWSERS_PATH, 'Google/Chrome/Application/chrome.exe');
                browserInfo.cmd  = '--new-window';
                break;
            default:
                throw new Error('Unsupported browser!');
        }

        await browserTools.open(browserInfo, pageUrl);

        await this.waitForConnectionReady(id);

        this.screenSizes[id] = await this.runInitScript(id, getScreenSize.toString());
    },

    async closeBrowser (id) {
        await browserTools.close(id);
    },

    
    // Browser names handling
    async getBrowserList () {
        return ['firefox', 'chrome'];
    },

    async isValidBrowserName (browserName) {
        var browserList = await this.getBrowserList();

        return browserList.indexOf(browserName) > -1;
    },
    

    // Extra methods
    async resizeWindow (id, width, height, currentWidth, currentHeight) {
        await browserTools.resize(id, currentWidth, currentHeight, width, height);
    },

    async canResizeWindowToDimensions (id, width, height) {
        var { width: screenWidth, height: screenHeight } = this.screenSizes[id];

        return width <= screenWidth && height <= screenHeight;
    },

    async maximizeWindow (id) {
        await browserTools.maximize(id);
    },

    async takeScreenshot (id, screenshotPath) {
        await browserTools.screenshot(id, screenshotPath);
    }
};
