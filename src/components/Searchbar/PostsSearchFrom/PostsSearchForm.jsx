import { Component } from "react";

import styles from "./posts-search-form.module.css";

class PostsSearchForm extends Component {
  state = {
    search: "",
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value.toLowerCase(),
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
    this.setState({
      search: "",
    });
  };
  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <header className={styles.searchbar}>
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormbutton}>
            <span className={styles["button-label"]}>Search</span>
          </button>

          <input
            name="search"
            value={search}
            onChange={handleChange}
            className={styles.SearchForminput}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

export default PostsSearchForm;
