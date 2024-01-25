import { Component } from "react";
import styles from "./searchbar.module.css";
import { searchPosts } from "../../api/posts";
import Button from "../Button/Button";

import PostsSearchForm from "./PostsSearchFrom/PostsSearchForm";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";

class Searchbar extends Component {
  state = {
    search: "",
    posts: [],
    loading: false,
    error: null,
    currentPage: 1,
    modalOpen: false,
    postDetails: {},
  };
  componentDidUpdate(prevProps, prevState) {
    const { search, currentPage } = this.state;
    if (
      (search && search !== prevState.search) ||
      currentPage !== prevState.currentPage
    ) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { search, currentPage, posts } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchPosts(search, currentPage);
      console.log(data);

      const newPosts =
        currentPage === 1
          ? data?.hits || []
          : data?.hits.filter((post) => !posts.some((p) => p.id === post.id));

      this.setState((prevState) => ({
        posts: [...prevState.posts, ...newPosts],
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = (searchQuery) => {
    this.setState({
      search: searchQuery,
      currentPage: 1,
      posts: [],
    });
  };
  handleImageClick = (webformatURL) => {
    this.setState({
      modalOpen: true,
      postDetails: {
        webformatURL,
      },
    });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    const { handleSearch, handleLoadMore } = this;
    const { posts, loading, error, postDetails } = this.state;

    const isPost = Boolean(posts.length);
    const shouldRenderLoadMore =
      isPost && !loading && !error && posts.length % 12 === 0;

    return (
      <>
        <PostsSearchForm onSubmit={handleSearch} />
        {error && <p className={styles.error}>{error}</p>}
        {loading && <p>...Loading</p>}
        {isPost && (
          <ImageGallery hits={posts} onImageClick={this.handleImageClick} />
        )}
        {shouldRenderLoadMore && (
          <Button onClick={handleLoadMore} type="button">
            Load more
          </Button>
        )}
        {this.state.modalOpen && (
          <Modal onClose={this.handleCloseModal}>
            <img src={postDetails.webformatURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default Searchbar;
