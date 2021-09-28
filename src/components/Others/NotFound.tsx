import * as React from 'react';

/* wrong page */
class NotFound extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <span> Wrong page </span>
            </div>
        );
    }
}

export default NotFound;
