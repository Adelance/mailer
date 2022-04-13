import React, { useRef } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchMails } from "../../actions/mailActions";

const SearchBar = ({ searchMails }) => {

    const text = useRef('');

    const onChange = e => {
        searchMails(text.current.value);
    }

    return(
        <nav style={{marginBottom: "30px"}} className="orange darken-2">
            <div className="nav-wrapper">
            <form>
                <div className="input-field">
                    <input id="search" type="search" placeholder="Wyszukaj E-mail..." ref={text} onChange={onChange}/>
                    <label className="label-icon" htmlFor="search">
                        <i className="material-icons">search</i>
                    </label>
                    <i className="material-icons">close</i>
                </div>
            </form>
            </div>
        </nav>  
    )
}

SearchBar.propTypes = {
    searchMails: PropTypes.func.isRequired
}

export default connect(null, { searchMails })(SearchBar);