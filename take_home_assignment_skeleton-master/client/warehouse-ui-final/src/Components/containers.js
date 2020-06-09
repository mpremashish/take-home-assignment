import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../s2mblacklogo.svg";
import {
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  FormGroup,
  Button,
  FormLabel
} from "react-bootstrap";
import querystring from "querystring";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "@progress/kendo-theme-default/dist/all.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Select from "react-select";
import Actions from "./actions";

export default class container extends Component {
  constructor(props, context) {
    super(props, context);
    const queryParams = querystring.parse(window.location.search.slice(1));
    this.state = {
      parentid: queryParams.id || 0,
      containerList: [],
      inventoryList: [],
      type: "",
      typebool: false,
      newInventoryname: "",
      newInventorydes: "",
      newInventoryamount: "",
      newContainerType: "Rack",
      newContainerShow: false,
      newInventoryShow: false,
      moveContainerShow: false
    };
    this.newInventoryCreate = this.newInventoryCreate.bind(this);
  }

  textChangeform = event => {
    switch (event.target.placeholder) {
      case "Name":
        this.setState({ newInventoryname: event.target.value });
        break;
      case "Description":
        this.setState({ newInventorydes: event.target.value });
        break;
      case "Quantity":
        this.setState({ newInventoryamount: event.target.value });
        break;
    }
  };

  containerlink = (cell, row) => {
    return (
      <a
        style={{ color: "#006dcc", textDecoration: "underline" }}
        href={`?id=` + row.barcode.replace("075", "").replace("XXXX", "")}
      >
        {row.barcode}
      </a>
    );
  };

  actionlink = (cell, row) => {
    return (
      <Actions
        {...row}
        handleChange={this.handleChange}
        parentId={this.state.parentid}
        typebool={this.state.typebool}
      />
    );
  };

  modaliclose = () => {
    this.setState({ newInventoryShow: false });
  };

  newInventoryCreate = () => {
    const postnewinventory = {
      parentId: this.state.parentid,
      name: this.state.newInventoryname,
      des: this.state.newInventorydes,
      amount: parseInt(this.state.newInventoryamount, 10)
    };
    const newinventory = fetch(`http://localhost:8080/createInventory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postnewinventory)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    Promise.all([newinventory]).then(this.handleChange);
    this.setState({ newInventoryShow: false });
  };

  handleNewContainerShow = () => {
    this.setState({ newContainerShow: true });
  };

  handleNewInventoryShow = () => {
    this.setState({ newInventoryShow: true });
  };

  handleContainerTypeChange = event => {
    this.setState({
      newContainerType: event.target.value
    });
  };

  handleAdd = () => {
    console.log(this.state.newContainerType);
    const postnewcontainer = {
      parentId: this.state.parentid,
      type: this.state.newContainerType.toLowerCase()
    };
    console.log(JSON.stringify(postnewcontainer));
    const newcontainer = fetch(`http://localhost:8080/createContainers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postnewcontainer)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    Promise.all([newcontainer]).then(this.handleChange);
    this.setState({ newContainerShow: false });
  };

  handleChange = () => {
    const queryParams = querystring.parse(window.location.search.slice(1));
    const defaultQueryParam = "?id=" + (queryParams.id || 0);
    fetch(`http://localhost:8080/containers` + defaultQueryParam)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          containerList: data.containers,
          inventoryList: data.inventories,
          typebool: data.typebool,
          type: data.type
        });
      })
      .catch(error => console.log(error));
  };

  handleClose = () => this.setState({ newContainerShow: false });

  async componentDidMount() {
    console.log("entered");
    const queryParams = querystring.parse(window.location.search.slice(1));
    const defaultQueryParam = "?id=" + (queryParams.id || 0);
    fetch(`http://localhost:8080/containers` + defaultQueryParam)
      .then(response => response.json())
      .then(data =>
        this.setState({
          containerList: data.containers,
          inventoryList: data.inventories,
          typebool: data.typebool,
          type: data.type
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    let list = this.state.typebool
      ? this.state.containerList
      : this.state.inventoryList;

    const popover = <Tooltip id="button-tooltip">Add Container</Tooltip>;
    const moveoptions = [];
    list.map(container => {
      if (container.typebool)
        moveoptions.push({
          value: container.barcode,
          label: container.type + "_" + container.barcode
        });
    });
    const storeid = "075";
    const products = [];

    const columnsInventory = [
      {
        dataField: "barcode",
        text: "Barcode"
      },
      {
        dataField: "name",
        text: "Item Name"
      },
      {
        dataField: "des",
        text: "Description"
      },
      {
        dataField: "amount",
        text: "Quantity"
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: this.actionlink
      }
    ];

    const columns = [
      {
        dataField: "barcode",
        text: "Barcode",
        formatter: this.containerlink
      },
      {
        dataField: "type",
        text: "Container Type"
      },
      {
        dataField: "name",
        text: "Item Name"
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: this.actionlink
      }
    ];

    this.state.typebool
      ? list.map(container => {
          products.push({
            barcode: storeid + container.barcode + "XXXX",
            type: container.type,
            name: container.type + "_" + container.barcode,
            Actions: "actions"
          });
        })
      : list.map(inventory => {
          products.push({
            barcode: storeid + inventory.barcode + "XXXX",
            name: inventory.name,
            des: inventory.des,
            amount: inventory.amount,
            Actions: "actions"
          });
        });

    return (
      <section>
        <Navbar bg="dark">
          <Navbar.Brand>
            <img
              src={logo}
              width="100"
              height="30"
              className="nav-logo"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row>
            <Col md={12} style={{ marginTop: "5px" }}>
              <Card>
                <Card.Body>
                  {this.state.typebool ? (
                    <td className="icon_span">
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={popover}
                      >
                        <span
                          class="k-icon k-i-folder-add k-icon-64"
                          title="Add"
                          onClick={this.handleNewContainerShow}
                        />
                      </OverlayTrigger>
                    </td>
                  ) : (
                    <td className="icon_span">
                      <span
                        class="k-icon k-i-file-add k-icon-64"
                        title="Add"
                        onClick={this.handleNewInventoryShow}
                      />
                    </td>
                  )}
                  <td className="font-header">
                    <span class="k-icon k-i-folder k-icon-64" title="Parent" />
                    {this.state.type + "_" + this.state.parentid}
                  </td>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12} style={{ marginTop: "5px" }}>
              <ToolkitProvider
                keyField="barcode"
                data={products}
                columns={this.state.typebool ? columns : columnsInventory}
              >
                {props => (
                  <div>
                    <BootstrapTable
                      {...props.baseProps}
                      hover
                      bordered={false}
                      pagination={paginationFactory()}
                      filter={filterFactory()}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Col>
          </Row>
          <Modal show={this.state.newContainerShow}>
            <Modal.Header>
              <Modal.Title>New Container</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <FormLabel>Container Type</FormLabel>
                  <Form.Control
                    as="select"
                    onChange={this.handleContainerTypeChange}
                  >
                    <option>Choose..</option>
                    <option>Rack</option>
                    <option>Box</option>
                    <option>Square</option>
                    <option>Paperbag</option>
                    <option>Leatherbag</option>
                    <option>itembox</option>
                  </Form.Control>
                </FormGroup>
              </Form>
              <div style={{ paddingTop: "10px" }} />
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.handleAdd}>
                Add
              </Button>
              <Button bsStyle="primary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.newInventoryShow} onHide={this.modaliclose}>
            <Modal.Header>
              <Modal.Title>New Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <FormLabel>Inventory Info</FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onChange={this.textChangeform}
                  />
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    onChange={this.textChangeform}
                  />
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Quantity"
                    onChange={this.textChangeform}
                  />
                  <br />
                </FormGroup>
              </Form>
              <div style={{ paddingTop: "10px" }} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.newInventoryCreate}>Add</Button>
              <Button onClick={this.modaliclose}>Close</Button>
            </Modal.Footer>
          </Modal>
          >
        </Container>
      </section>
    );
  }
}
