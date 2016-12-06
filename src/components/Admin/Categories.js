import React, {Component} from 'react'
import Category from '../../models/categoryModel'
import Pager from 'react-pager';
import $ from 'jquery';
import observer from '../../models/observer'
let categoryModule = new Category()

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            category: {name: ''},
            edit: false,
            categories: [],
            pageCategories: [],
            total:       0,
            current:     0,
            visiblePage: 10
        }
        this.bindEventHandlers()
    }

    onChangeHandler(event) {
        this.setState({
            current: 0
        })
        this.setState({
            pageCategories: this.state.categories,
            total: Math.ceil(this.state.posts.length / 10),
        })
    }

    handlePageChanged(newPage) {
        this.setState({
            current: newPage,
            total: Math.ceil(this.state.categories.length / 10),
            pageCategories: this.state.categories.slice(newPage * this.state.visiblePage , (newPage * this.state.visiblePage)+10)
        })
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
        this.handlePageChanged = this.handlePageChanged.bind(this)
        this.createCategory = this.createCategory.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
        this.editCategory = this.editCategory.bind(this)
        this.changeCategoryState = this.changeCategoryState.bind(this)
        this.confirmEdit = this.confirmEdit.bind(this)
    }

    componentDidMount(action) {

        switch (action){
            case 'create':
                categoryModule.getAllCategories(this.onLoadSuccess)
                observer.showSuccess('Category created!')
                $('#Category').val('')
                break
            case 'delete':
                categoryModule.getAllCategories(this.onLoadSuccess)
                observer.showSuccess('Category deleted!')
                $('#Category').val('')
                break
            case 'duplicate':
                observer.showError('Category with that name already exists!')
                break
            case 'edit':
                observer.showError('Category name edited!')
                categoryModule.getAllCategories(this.onLoadSuccess)
                break
            default:
                categoryModule.getAllCategories(this.onLoadSuccess)
                break

        }
        $('#createCategory').attr('disabled', false)
    }

    onLoadSuccess(categories) {
        this.setState({
            edit: false,
            categories: categories.sort((a, b) => {
                return b._kmd.lmt.localeCompare(a._kmd.lmt)
            }),
            pageCategories: categories.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 10),
            total: Math.ceil(categories.length / 10),
        })
    }

    createCategory(){
        $('#createCategory').attr('disabled', true)
        let name = $('.form-control').val()
        if(name.length < 5){
            observer.showError('Category name must consist at least 5 characters!')
            $('#createCategory').attr('disabled', false)
        } else {
            categoryModule.createCategory(name,this.componentDidMount)
        }
    }

    deleteCategory(cat){
        categoryModule.deleteCategory(cat._id, this.componentDidMount)
    }

    editCategory(cat){
        this.setState({
            id:cat._id,
            edit: true,
            category: cat
        })
    }

    confirmEdit() {
        let newName = $('#NewCategory').val()
        categoryModule.editCategory(this.state.id, newName, this.componentDidMount)
    }

    changeCategoryState() {
        event.preventDefault();
        let val = $('#NewCategory').val()
        this.setState({
            category: {
                name: val
            }
        });
    }

    render() {

        if(this.state.edit){

            return(
                <div>
                    <div className="form-group">
                        <label>Category name:</label>
                        <input id="NewCategory"
                               className="form-control"
                               type="text"
                               name="title"
                               value={this.state.category.name}
                               onChange={this.changeCategoryState}
                        />
                    </div>
                    <button id="editCategory" className="btn btn-primary" onClick={this.confirmEdit}>Edit</button>
                </div>
            )

        } else {
            let categoryRows = this.state.pageCategories.map(category =>
                <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{new Date(Date.parse(category._kmd.lmt)).toLocaleString()}</td>
                    <td>
                        <button className="btn btn-danger" onClick={() => this.deleteCategory(category)}>Delete</button>
                        <button className="btn btn-warning" onClick={() => this.editCategory(category)}>Edit</button>
                    </td>
                </tr>
            );

            return (
                <div>
                    <h1>All Categories</h1>
                    <br/>
                    <div className="form-group">
                        <label>Category name:</label>
                        <input id="Category" className="form-control" type="text" name="title"/>
                    </div>
                    <button id="createCategory" className="btn btn-primary" onClick={this.createCategory}>Create New
                        Category
                    </button>
                    <br/>
                    <br/>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Category name</th>
                            <th>Date of publication</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categoryRows}
                        </tbody>
                    </table>
                    <Pager
                        total={this.state.total}
                        current={this.state.current}
                        visiblePages={this.state.visiblePage}
                        titles={{first: '<|', last: '>|'}}
                        onPageChanged={this.handlePageChanged}
                    />
                </div>
            )
        }
    }
}

Categories.contextTypes = {
    router: React.PropTypes.object
}