/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from "components/form";
import Input from "components/input";
import {Link} from "react-router-dom";
import * as routes from "routes";

class EditMerchant extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            gstBc: this.props && this.props.merchant.b2c,
        }
    }

    componentDidMount() {
        const {params} = this.props.match;
        params && params.merchantId && this.props.showMerchant(params.merchantId);
    
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            gstBc:nextProps && nextProps.merchant.b2c
         }) 
        }
      
    onChangeCheckbox = event => {
      this.setState({gstBc:event.target.checked});
      const todoText = this.refs.gstin.value;
      if(todoText.length > 0){
       this.refs.gstin.value = '';
        
      } 
    }
  

    getData = () => {
        const {
            // metadata
            name,
            merchantId,
            pan,
            serviceTaxNo,
            tin,
            cin,
            gstin,
            gstStateCode,

            // contact info
            phone,
            email,

            // account info
            accountNo,
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
            serviceTaxNo: serviceTaxNo.value(),
            tin: tin.value(),
            cin: cin.value(),
            gstin: gstin.value,
            gstStateCode: gstStateCode.value(),

            phone: phone.value(),
            email: email.value(),

            accountNo: accountNo.value(),
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
       const {merchant} = this.props;
       const { gstBc } = this.state;
      
        return (
            <div className="page-container">
                <Form
                    {...this.props}
                    serializeForm={this.getData}
                    submitAction={this.props.attemptEditMerchant}
                    editStatus={true}
                    id={merchant.id}>
                    <h1 className="page-header">
                        <span className="required-message">All fields are required</span>
                        Create Merchant
                    </h1>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="control-label">Merchant Name:</label>
                                <Input ref="name" focus={true} maxLength={100} defaultValue={merchant.name}/>
                            </div>
                            <div className="col-md-6">
                                <label className="control-label">Merchant ID:</label>
                                <Input ref="merchantId" maxLength={64} defaultValue={merchant.merchantId}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="control-label">PAN Card:</label>
                                <Input ref="pan" defaultValue={merchant.pan}/>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">Service Tax Number:</label>
                                <Input ref="serviceTaxNo" defaultValue={merchant.serviceTaxNo}/>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">TIN Number:</label>
                                <Input ref="tin" maxLength={32} defaultValue={merchant.tin}/>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">CIN Number:</label>
                                <Input ref="cin" maxLength={32} defaultValue={merchant.cin}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="control-label">GSTIN:</label>
                                <input className="form-control"  disabled={gstBc} ref="gstin" defaultValue={merchant.gstin}/>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label">GST State Code:</label>
                                <Input ref="gstStateCode" defaultValue={merchant.gstStateCode}/>
                            </div>
                    <div className="col-md-3">
                            <div className="form-group checkbox">
                      <label>
                        <input
                          type="checkbox"
                          id="gstBc"
                          ref="b2c"
                          checked={!!gstBc}
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
                                    <Input ref="phone" type="tel" defaultValue={merchant.phone}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Email ID:</label>
                                    <Input ref="email" type="email" defaultValue={merchant.email}/>
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
                                    <Input ref="accountNo" maxLength={32} defaultValue={merchant.accountNo}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Account Type:</label>
                                    <Input ref="accountType" type="select" defaultValue={merchant.accountType}>
                                        <option>SAVING</option>
                                        <option>USER</option>
                                        <option>NODAL</option>
                                        <option>ESCROW</option>
                                        <option>CURRENT</option>
                                    </Input>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">IFSC Code:</label>
                                    <Input ref="ifsc" defaultValue={merchant.ifsc}/>
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
                                    <Input ref="building" defaultValue={merchant.address ? merchant.address.building : ''}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Street:</label>
                                    <Input ref="street" defaultValue={ merchant.address ? merchant.address.street : ''}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Area:</label>
                                    <Input ref="area" defaultValue={merchant.address ? merchant.address.area : ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Locality:</label>
                                    <Input ref="locality" defaultValue={merchant.address ? merchant.address.locality : ''}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">City:</label>
                                    <Input ref="city" defaultValue={merchant.address ? merchant.address.city : ''}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">State:</label>
                                    <Input ref="state" defaultValue={merchant.address ? merchant.address.state : ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label">Country:</label>
                                    <Input ref="country" defaultValue={merchant.address ? merchant.address.country : ''}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Postal:</label>
                                    <Input ref="postalCode" defaultValue={merchant.address ? merchant.address.postalCode : ''}/>
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
                                    <Input ref="ftpServerAddress" maxLength={255}
                                           defaultValue={merchant.ftpServerAddress} required={false}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Port:</label>
                                    <Input ref="ftpPort" maxLength={5} defaultValue={merchant.ftpPort}
                                           required={false}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Transfer Protocol:</label>
                                    <Input ref="ftpTransferProtocol" type="select"
                                           defaultValue={merchant.ftpTransferProtocol} required={false}>
                                        <option>ftp</option>
                                        <option>ftps</option>
                                        <option>sftp</option>
                                    </Input>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Output Directory:</label>
                                    <Input ref="ftpOutputDirectory" maxLength={255}
                                           defaultValue={merchant.ftpOutputDirectory} required={false}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Username:</label>
                                    <Input ref="ftpUsername" maxLength={64} defaultValue={merchant.ftpUsername}
                                           required={false}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Password:</label>
                                    <Input ref="ftpPassword" type="password" maxLength={64}
                                           defaultValue={merchant.ftpPassword} required={false}/>
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
                                    <Input ref="settlementTemplateId" maxLength={255}
                                           defaultValue={merchant.settlementTemplateId} required={false}/>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">Invoice Report Template ID:</label>
                                    <Input ref="invoiceTemplateId" maxLength={5} defaultValue={merchant.invoiceTemplateId}
                                           required={false}/>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <br/>
                    <button
                        className="btn btn-lg btn-block btn-success">Update Merchant
                    </button>
                    <div className="form-group">
                        or <Link to={routes.LIST_MERCHANTS_PATH}>cancel</Link>
                    </div>
                </Form>
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMerchant);

