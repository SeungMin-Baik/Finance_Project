import * as React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router';
import isEmpty from 'lodash-es/isEmpty';

// Route history
import { history } from '@app/store';

// Locale data
import enLocaleData from 'react-intl/locale-data/en';
import koLocaleData from 'react-intl/locale-data/ko';

// App component and style
import App from './components/App';
import './stylesheets/main.scss';


/** State of `Root` component. */
type RootComponentState = {
    /** Current locale. */
    localeCode: string;
    /** Current locale data. */
    translations: any;
};

class Root extends React.Component<{}, RootComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            localeCode: 'en',
            translations: {}
        };
    }

    componentWillMount() {
        // Add locale data to app.
        addLocaleData([
            ...enLocaleData,
            ...koLocaleData
        ]);

        // Apply translations to app.
        this.applyTranslations();
    }

    render() {
        return (
            !isEmpty(this.state.translations) ?
                <IntlProvider
                    locale={this.state.localeCode}
                    messages={this.state.translations}
                >
                    <ConnectedRouter history={history}>
                        <App />
                    </ConnectedRouter>
                </IntlProvider>
            :
                null
        );
    }


    /**
     * Apply translation data to app, asynchronously.
     */
    private async applyTranslations() {
        // Get current locale code and translation data.
        let localeCode = this.getCurrentLocaleCode();
        let translations = await this.fetchLocaleData(localeCode);

        // If translation data empty, fallback with English data.
        if (isEmpty(translations)) {
            localeCode = 'en';
            translations = await this.fetchLocaleData(localeCode);
        }

        // Set locale code and translation data.
        this.setState({ localeCode, translations });

        // Update attribute value of lang tag.
        const rootTag = document.querySelector('html');
        if (rootTag) {
            // Update with current locale code.
            rootTag.setAttribute('lang', localeCode);
        }
    }


    /**
     * Fetch translation file from server.
     * Traslation tool: https://www.codeandweb.com/babeledit/download
     * @param code  Locale code.
     * @returns     Translation data.
     */
    private fetchLocaleData(code: string): Promise<any> {
        return new Promise<any>(resolve => {
            fetch(`/public/locales/${code}.json`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(resolve)
            .catch(() => resolve({}));
        });
    }


    /**
     * Get current locale code for fetch translation file.
     * @returns Locale code with 2 letters. (ex. `en`, `ko`)
     */
    private getCurrentLocaleCode(): string {
        // Get support languages from browser.
        const supportLangs = navigator.languages;
        for (let i = 0; i < supportLangs.length; i++) {
            // Find locale with 2 letters...
            if (supportLangs[i].match(/^\w{2}$/)) {
                return supportLangs[i];
            }
        }

        // Return default language as English.
        return 'en';
    }
}

export default Root;
