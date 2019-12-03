import React, { Component } from 'react'
import { connect } from 'react-redux';

import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import { message } from 'antd';
import { Upload, Icon, Modal } from 'antd';
import { InputNumber } from 'antd';
import {
    getDetailProductAction,
    getListProducertAction,
    getListProviderAction,
    getListTypeProductAction,
    updateProductAction
} from './../redux/actions/AdminData';
import "./Style.css";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class ProductDetail extends Component {
    constructor(props) {
        super(props);
      //  this.props.getDetailProductAD(this.state.id);
        this.props.getListTypeProductAD();
        this.props.getListProviderAD();
        this.props.getListProducerAD();


    }
    state = {
        //get id product 
        id: this.props.match.params.id,
        //upload image ant design
        previewVisible: false,
        previewImage: '',
        fileList: [],
        productInfor:{
            // maLoaiSP: "",
            // maNSX: "",
            // maNCC: "",
            // tenSP: "",
            // maSP: "",
            // moTa: "",
            // donGia: 0,
            // soLuongTon: 0,
            // trangThai: true,
            // spMoi: true,
            // hinhAnh: ""
        }
       
    }

    handleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            productInfor: {
                  ...this.state.productInfor,
                  [name]: value
            }
        })
        console.log(this.state.productInfor);
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList });


    //update product infor
    updateProductInfor=(product)=>{
        
        this.props.updateProductInfor(product)
    }


    //get id product from url
    componentDidMount() {
        this.props.getDetailProductAD(this.state.id);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return{
            ...prevState, productInfor: nextProps.item
        }
    }

    onChangeStock = (value) => {
        this.setState({
            productInfor: {
                  ...this.state.productInfor,
                  soLuongTon: value
            }
        })
        
    }
    onChangePrice = (value) => {
        this.setState({
            productInfor: {
                  ...this.state.productInfor,
                  donGia: value
            }
        })
        
    }
    render() {



        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div className="cover">
                <p className="cover-title">{this.state.productInfor.tenSP}</p>

                <div className="d-flex mt-4 justify-content-between">
                    {/* div left  */}
                    <Paper className="col-md-8">
                        <div>
                            <p className="content_title">General information</p>
                            <hr />
                            <TextField
                                className="textfield_style"
                                id="outlined-helperText"
                                label="Name"
                                value={this.state.productInfor.tenSP}
                                margin="normal"
                                variant="outlined"
                                name="tenSP"
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                className="textfield_style"
                                id="outlined-helperText"
                                label="Decription"
                                value={this.state.productInfor.moTa}
                                multiline
                                margin="normal"
                                variant="outlined"
                                name="moTa"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="mt-5 pb-5">
                            <span className="content_title">Images</span>
                            <hr />
                            <div className="d-flex">
                                <img width="200px" style={{ marginRight: 10 }} src={this.state.productInfor.hinhAnh} alt="" />
                                <Upload
                                    action={props.action}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: 200 }} src={previewImage} />
                                </Modal>
                            </div>

                        </div>


                    </Paper>
                    {/* div right  */}
                    <div className=" col-md-4 ">
                        <Paper className="paper_col">
                            <p className="content_title">Organize Product</p>
                            <hr />
                            <p className="content_title">Attributes</p>
                            <TextField
                                select
                                label="Categalory"
                                value={this.state.productInfor.maLoaiSP}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="maLoaiSP"
                                onChange={this.handleInputChange}
                            >
                                {this.props.type.map((itemx, index) => {
                                    return (<option style={{ padding: 7 }} key={index} value={itemx.maLoaiSP}>{itemx.tenLoai}</option>)
                                })}

                            </TextField>
                            <TextField
                                select
                                label="Provider"
                                value={this.state.productInfor.maNCC}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="maNCC"
                                onChange={this.handleInputChange}
                            >
                                {this.props.provider.map((itemx, index) => {
                                    return (<option style={{ padding: 7 }} key={index} value={itemx.maNCC}>{itemx.tenNCC}</option>)
                                })}

                                {/* <option value='Wine'>CoCa CoLa</option> */}
                            </TextField>
                            <TextField
                                select
                                label="Producer"
                                value={this.state.productInfor.maNSX}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="maNSX"
                                onChange={this.handleInputChange}
                            >
                                {this.props.producer.map((itemx, index) => {
                                    return (<option style={{ padding: 7 }} key={index} value={itemx.maNSX}>{itemx.tenNSX}</option>)
                                })}

                                {/* <option value='Wine'>Wine</option> */}
                            </TextField>
                        </Paper>
                        <br />
                        <Paper className="paper_col" style={{paddingTop:10}}>
                            <div style={{ fontSize: 18, marginBottom: 20 }}>Pricing ($) : <InputNumber name="donGia" style={{ float: "right", width: 150 }} min={1} value={this.state.productInfor.donGia} onChange={this.onChangePrice} step={1000} /> </div>
                            <div style={{ fontSize: 18 }}>In Stock : <InputNumber name="soLuongTon" style={{ float: "right", width: 150 }} min={1} value={this.state.productInfor.soLuongTon} onChange={this.onChangeStock} /> </div>
                            <hr />
                            <div>

                            </div>
                            <span style={{ fontSize: 18 }}>Visibility</span>
                            <span style={{ float: "right" }}><Switch
                                //  checked='true'
                                // onChange="false"
                                value="checkedA"
                                color="primary"
                            /></span>

                            <br style={{ clear: "right" }} />
                            <span style={{ fontSize: 18 }}>New Product</span>
                            <span style={{ float: "right" }}>
                                <Switch
                                    checked={this.state.productInfor.spMoi}
                                    //  onChange="false"
                                    value="checkedA"
                                    color="primary"
                                />
                            </span>
                            <div className="group_button">
                                <Button
                                    onClick={()=>{this.updateProductInfor(this.state.productInfor)}}
                                    style={{ width: '45%' }}
                                    variant="outlined"
                                    color="secondary">
                                    Save
                                </Button>
                                <Button
                                    style={{ width: '45%' }}
                                    variant="outlined"
                                    color="primary">
                                    Cancel
                                </Button>
                            </div>
                        </Paper>
                    </div>

                    {/* end div right */}
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        item: state.rootReducerAD.detail,
        producer: state.rootReducerAD.listProducer,
        provider: state.rootReducerAD.listProvider,
        type: state.rootReducerAD.listTypeProduct
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDetailProductAD: (maSP) => {
            dispatch(getDetailProductAction(maSP))
        },
        getListProducerAD: () => {
            dispatch(getListProducertAction())
        },
        getListProviderAD: () => {
            dispatch(getListProviderAction())
        },
        getListTypeProductAD: () => {
            dispatch(getListTypeProductAction())
        },
        updateProductInfor: (product)=>{
            dispatch(updateProductAction(product))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
//export default ProductDetail