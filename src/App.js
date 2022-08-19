import React, { Component } from 'react';
import web3 from './web3';
import mina from './mina';



class App extends Component {
  state = {
    apps: [],
    value: '',
    appName: '',
    appLink: '',
    id: "",
  };

  async componentDidMount() {
    const apps = await mina.methods.getApps().call();

    this.setState({ apps });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();


    this.setState({ message: 'Waiting on trasaction success...' })

    await mina.methods.enterApp(this.state.appName, this.state.appLink, this.state.id).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
    });

    this.setState({ message: 'App successfully submitted to the OS!' });
  }

  render() {
    console.log(this.state.apps);
    return (
      <div>
      <h2>{this.state.apps}</h2>

      <hr />

      <form onSubmit={this.onSubmit}>
        <h4>Want to add an app to mina ?</h4>
        <div>
          <label>Amount of ether</label>
          <input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </div>
        <div>
          <label>Name of the App</label>
          <input
            value={this.state.appName}
            onChange={event => this.setState({ appName: event.target.value })}
          />
        </div>
        <div>
          <label>Link to the App</label>
          <input
            value={this.state.appLink}
            onChange={event => this.setState({ appLink: event.target.value })}
          />
        </div>
        <div>
          <label>Unique ID</label>
          <input
            value={this.state.id}
            onChange={event => this.setState({ id: event.target.value })}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr />
      <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
