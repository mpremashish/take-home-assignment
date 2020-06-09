import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Form, FormGroup, Button, FormLabel } from "react-bootstrap";
import Select from "react-select";

export default class Actions extends Component {
  static propTypes = {
    row: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      barcode: this.props.barcode,
      type: this.props.type,
      moveContainerShow: false,
      containers: [],
      newdest: null,
      rootparentshow: false,
      rootParent: ""
    };
  }

  serachParent = () => {
    fetch(
      `http://localhost:8080/rootParentInventory?id=${this.props.barcode
        .replace("075", "")
        .replace("XXXX", "")}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({ rootParent: `${data.type}_${data.barcode}` })
      )
      .catch(error => console.log(error));

    this.setState({ rootparentshow: true });
  };

  handleMoveContainerShow = () => {
    fetch(`http://localhost:8080/containers?id=allcsc`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          containers: data.containers
        })
      )
      .catch(error => console.log(error));
    this.setState({ moveContainerShow: true });
  };

  handleMoveInventoryShow = () => {
    fetch(`http://localhost:8080/containers?id=allcsi`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          containers: data.containers
        })
      )
      .catch(error => console.log(error));
    this.setState({ moveContainerShow: true });
  };

  modalcloseroot = () => {
    this.setState({ rootparentshow: false });
  };
  modalclose = () => {
    this.setState({ moveContainerShow: false });
  };

  containerChange = event => {
    console.log(event);
    this.setState({ newdest: event.value });
  };

  DeleteInventory = () => {
    const deletecontainer = fetch(
      `http://localhost:8080/deleteInventory/${this.props.barcode
        .replace("075", "")
        .replace("XXXX", "")}`,
      {
        method: "DELETE"
      }
    )
      .then(response => response.json())
      .then(data => console.log(data.value))
      .catch(error => console.log(error));

    Promise.all([deletecontainer]).then(this.props.handleChange);
  };

  DeleteContainer = () => {
    const deletecontainer = fetch(
      `http://localhost:8080/deleteContainer/${this.props.barcode
        .replace("075", "")
        .replace("XXXX", "")}`,
      {
        method: "DELETE"
      }
    )
      .then(response => response.status)
      .then(data => data.value)
      .catch(error => console.log(error));

    Promise.all([deletecontainer]).then(this.props.handleChange);
  };

  handlemove = () => {
    const postmovecontainer = {
      sourceId: this.state.barcode.replace("075", "").replace("XXXX", ""),
      destId: this.state.newdest
    };
    console.log(JSON.stringify(postmovecontainer));
    const movecontainer = fetch(`http://localhost:8080/moveContainer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postmovecontainer)
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          containerList: data.containers,
          typebool: data.typebool,
          type: data.type
        })
      )
      .catch(error => console.log(error));

    Promise.all([movecontainer]).then(this.props.handleChange);

    this.setState({ moveContainerShow: false });
  };

  handlemoveinventory = () => {
    const postmoveinventory = {
      sourceId: this.state.barcode.replace("075", "").replace("XXXX", ""),
      destId: this.state.newdest
    };
    console.log(JSON.stringify(postmoveinventory));
    const movecontainer = fetch(`http://localhost:8080/moveInventory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postmoveinventory)
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          containerList: data.containers,
          typebool: data.typebool,
          type: data.type
        })
      )
      .catch(error => console.log(error));

    Promise.all([movecontainer]).then(this.props.handleChange);

    this.setState({ moveContainerShow: false });
  };

  render() {
    const options = [];
    this.state.containers.map(container => {
      if (
        container.barcode.toString() !==
          this.props.barcode
            .toString()
            .replace("075", "")
            .replace("XXXX", "") &&
        container.barcode.toString() !==
          this.props.parentId
            .toString()
            .replace("075", "")
            .replace("XXXX", "")
      )
        options.push({
          value: container.barcode,
          label: container.type + "_" + container.barcode
        });
    });
    return (
      <div style={{ display: "inline-block" }}>
        <span
          class="k-icon k-i-redo k-icon-64"
          style={{ marginRight: "15px" }}
          title="Move"
          onClick={
            this.props.typebool
              ? this.handleMoveContainerShow
              : this.handleMoveInventoryShow
          }
        />
        <span
          class="k-icon k-i-trash k-icon-64"
          title="Delete"
          onClick={
            this.props.typebool ? this.DeleteContainer : this.DeleteInventory
          }
        />
        {console.log(this.props.typebool)}
        {!this.props.typebool ? (
          <span
            class="k-icon k-i-info k-icon-64"
            title="info"
            onClick={this.serachParent}
          />
        ) : null}
        <Modal show={this.state.moveContainerShow} onHide={this.modalclose}>
          <Modal.Header>
            <Modal.Title>
              {this.props.typebool ? "Move Container" : "Move Inventory"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <FormLabel>
                  {this.props.typebool
                    ? "Container List(containers which can hold other container)"
                    : "Container List(containers which can hold other Inventory)"}
                </FormLabel>
                <Select options={options} onChange={this.containerChange} />
              </FormGroup>
            </Form>
            <div style={{ paddingTop: "10px" }} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={
                this.props.typebool ? this.handlemove : this.handlemoveinventory
              }
            >
              Add
            </Button>
            <Button onClick={this.modalclose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.rootparentshow} onHide={this.modalcloseroot}>
          <Modal.Header>
            <Modal.Title>Root Parent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>{this.state.rootParent}</h1>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
