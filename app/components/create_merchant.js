import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from "components/form";
import Input from "components/input";

class CreateMerchant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        gstBc:false,
        gstBcEnable: false,
        };
      }
    
      onChangeCheckbox = event => {
     
        this.setState({ [event.target.id]: !this.state[event.target.id],gstBcEnable: event.target.checked });

    const todoText = this.refs.gstin.value;
    if(todoText.length > 0){
        this.refs.gstin.value = ''; 
    } 
      };

    getData = () => {
        const {
            // metadata
            name,
            merchantId,
            pan,
            serviceTax,
            tin,
            cin,
            gstin,
            gstStateCode,

            // contact info
            phone,
            email,

            // account info
            accountNumber,
            accountType,
            ifsc,

            // address
            building,
            street,
            area,
            locality,
            city,
            state,
            country,
            postalCode,

            // ftp details
            ftpServerAddress,
            ftpPort,
            ftpTransferProtocol,
            ftpOutputDirectory,
            ftpUsername,
            ftpPassword,
            settlementTemplateId,
            invoiceTemplateId

        } = this.refs;

        return {
            name: name.value(),
            merchantId: merchantId.value(),
            pan: pan.value(),
            serviceTaxNo: serviceTax.value(),
            tin: tin.value(),
            cin: cin.value(),
            gstin: gstin.value,
            gstStateCode: gstStateCode.value(),

            phone: phone.value(),
            email: email.value(),

            accountNo: accountNumber.value(),
            accountType: accountType.value(),
            ifsc: ifsc.value(),

            address: {
                building: building.value(),
                street: street.value(),
                area: area.value(),
                locality: locality.value(),
                city: city.value(),
                state: state.value(),
                country: country.value(),
                postalCode: postalCode.value()
            },

            b2c:this.state.gstBc ,

            ftpServerAddress: ftpServerAddress.value(),
            ftpPort: ftpPort.value(),
            ftpTransferProtocol: ftpTransferProtocol.value(),
            ftpOutputDirectory: ftpOutputDirectory.value(),
            ftpUsername: ftpUsername.value(),
            ftpPassword: ftpPassword.value(),

            settlementTemplateId:settlementTemplateId.value(),
            invoiceTemplateId:invoiceTemplateId.value()
            
        };
    }

    render() {
        const gstBcEnable = this.state.gstBcEnable;
       
        return (
            <div className="page-container">
                <Form
                    {...this.props}
                    serializeForm={this.getData}
                    submitAction={this.props.attemptCreateMerchant}>
                    <h1 className="page-header">
                        <span className="required-message">All fields are required</span>
                        Create Merchant
                    </h1>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="control-label">Merchant Name:</label>
                                <Input ref="name" focus={true} maxLength={100} pattern={/^[a-zA-Z ]+$/} />
                            </div>
                            <div className="col-md-6">
                                <label className="control-label">Merchant ID:</label>
                                <Input ref="merchantId" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="control-label">PAN Card:</label>
                                <Input ref="pan" />
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">Service Tax Number:</label>
                                <Input ref="serviceTax" />
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">TIN Number:</label>
                                <Input ref="tin" maxLength={32} />
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">CIN Number:</label>
                                <Input ref="cin" maxLength={32} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="control-label">GSTIN:</label>
                                <input className="form-control" ref="gstin" type="text" disabled={gstBcEnable}  />
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">GST State Code:</label>
                                <Input ref="gstStateCode"  />
                            </div>
                            <div className="col-md-3">
                            <div className="form-group checkbox">
                      <label>
                        <input
                          type="checkbox"
                          id="gstBc"
                          checked={this.state.gstBc ? true : false}
                          onChange={this.onChangeCheckbox}
                        />
                        B2C
                </label>
                    </div>
                            </div>
                          
                        </div>
                    </div>

                    <fieldset>
                        <legend>Contact Info:</legend>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Phone Number:</label>
                                    <Input ref="phone" type="tel" />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Email ID:</label>
                                    <Input ref="email" type="email" />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Account Info:</legend>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Account Number:</label>
                                    <Input ref="accountNumber" maxLength={32} />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Account Type:</label>
                                    <Input ref="accountType" type="select">
                                        <option value="">Select Account Type</option>
                                        <option>SAVING</option>
                                        <option>USER</option>
                                        <option>NODAL</option>
                                        <option>ESCROW</option>
                                        <option>CURRENT</option>
                                    </Input>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">IFSC Code:</label>
                                    <Input ref="ifsc" />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Address Info:</legend>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Building:</label>
                                    <Input ref="building" />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Street:</label>
                                    <Input ref="street" />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Area:</label>
                                    <Input ref="area" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Locality:</label>
                                    <Input ref="locality" />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">City:</label>
                                    <Input ref="city" />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">State:</label>
                                    <Input ref="state" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Country:</label>
                                    <Input ref="country" />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Postal:</label>
                                    <Input ref="postalCode" />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>FTP Details:</legend>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Server Address:</label>
                                    <Input ref="ftpServerAddress" maxLength={255} required={false} />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Port:</label>
                                    <Input ref="ftpPort" maxLength={5} required={false} />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Transfer Protocol:</label>
                                    <Input ref="ftpTransferProtocol" type="select" required={false}>
                                        <option value="">Select Transfer Protocol</option>
                                        <option>ftp</option>
                                        <option>ftps</option>
                                        <option>sftp</option>
                                    </Input>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Output Directory:</label>
                                    <Input ref="ftpOutputDirectory" maxLength={255} required={false} />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Username:</label>
                                    <Input ref="ftpUsername" maxLength={64} required={false} />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Password:</label>
                                    <Input ref="ftpPassword" type="password" maxLength={64} required={false} />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Report Templates:</legend>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Settlement Report Template ID:</label>
                                    <Input ref="settlementTemplateId" maxLength={255} required={false} />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Invoice Report Template ID:</label>
                                    <Input ref="invoiceTemplateId" maxLength={5} required={false} />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <br />
                    <button
                        className="btn btn-lg btn-block btn-success">Create Merchant
                    </button>
                </Form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMerchant);
