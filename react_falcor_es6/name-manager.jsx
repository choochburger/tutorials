var React = require('react');
var ReactDom = require('react-dom');
var NameAdder = require('./name-adder.jsx');
var NamesList = require('./names-list.jsx');

class NameManager extends React.Component {
    handleNameAdded() {
        this.refs.namesList.update();
    }

    render() {
        return (
            <div>
                <NameAdder onAdded={this.handleNameAdded.bind(this)}/>
                <NamesList ref="namesList"/>
            </div>
        );
    }
}

ReactDom.render(<NameManager/>, document.querySelector('#demo'));
