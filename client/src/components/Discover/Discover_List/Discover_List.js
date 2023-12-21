import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Modal from '../../Modal/Modal';
import ErrorReminder from '../../Error_Reminder/Error_Reminder'
import './Discover_List.css'; // 导入样式文件
import { Pagination, List, Spin } from 'antd'
import axios from 'axios'

class DiscoverList extends Component {
    static propTypes = {
        Discover_List_Style: PropTypes.object,
        Search_String: PropTypes.string,
        select_Bar_State: PropTypes.string,
    }

    handleLoadPostNumber = (Search_String) => {
      const our_url = "/api/discover-postnum";
      const postData = {Search_String}
      return new Promise((resolve, reject) => {
        axios.get(our_url, {
          params: postData
      })
        .then(res => {
            if (res.data === "数据库查询失败") {
                alert("数据库查询失败");
                resolve(null);
            } 
            else{
                const totalPosts = res.data.totalPosts;
                resolve(totalPosts)
            }
        })
        .catch(e => {
            alert("404 handleLoadPostNumber响应失败: " + e.message);
            resolve(0);
        });
      });
    }

    handleLoadPostAvatar = (currentPage, select_Bar_State, Search_String, ordinal) => {
      const our_url = "/api/discover-postavatar/" + currentPage + "/" + ordinal;
      const postData = {
        select_Bar_State: select_Bar_State, 
        Search_String: Search_String, 
      };

      return new Promise((resolve, reject) => {
          axios.get(our_url, {
              params: postData,
              responseType: 'arraybuffer'
          })
          .then(res => {
              if (res.data === "数据库查询失败") {
                  alert("数据库查询失败");
                  resolve(null);
              } else if (res.data === "该条帖子不存在") {
                  alert("该条帖子不存在");
                  resolve(null);
              } else {
                  const blob = new Blob([res.data], { type: 'application/octet-stream' });
                  const url = URL.createObjectURL(blob);
                  resolve(url);
              }
          })
          .catch(e => {
              alert("404 handleLoadPostAvatar响应失败: " + e.message);
              resolve(null);
          });
      });
    };

    handleLoadPostPicture = (currentPage, select_Bar_State, Search_String,ordinal) => {
      const our_url = "/api/discover-postpicture/" + currentPage + "/" + ordinal;
      const postData = {
        select_Bar_State: select_Bar_State, 
        Search_String: Search_String, 
      };

      return new Promise((resolve, reject) => {
          axios.get(our_url, {
              params: postData,
              responseType: 'arraybuffer'
          })
          .then(res => {
              if (res.data === "数据库查询失败") {
                  alert("数据库查询失败");
                  resolve(null);
              } else if (res.data === "该条帖子不存在") {
                  alert("该条帖子不存在");
                  resolve(null);
              } else {
                  const blob = new Blob([res.data], { type: 'application/octet-stream' });
                  const url = URL.createObjectURL(blob);
                  resolve(url);
              }
          })
          .catch(e => {
              alert("404 handleLoadPostPicture响应失败: " + e.message);
              resolve(null);
          });
      });
    };

    handleLoadPostString = (currentPage, select_Bar_State, Search_String,ordinal) => {
      const our_url = "/api/discover-poststring/" + currentPage + "/" + ordinal;
      const postData = {
        select_Bar_State: select_Bar_State, 
        Search_String: Search_String, 
      };
      return new Promise((resolve, reject) => {
          axios.get(our_url, {
            params: postData
        })
          .then(res => {
              if (res.data === "数据库查询失败") {
                  alert("数据库查询失败");
                  resolve({
                      author_name: null,
                      post_text: null,
                      like_num: null
                  });
              } else if (res.data === "该条帖子不存在") {
                  alert("该条帖子不存在");
                  resolve({
                    author_name: null,
                    post_text: null,
                    like_num: null
                  });
              } else if (res.data === "该用户不存在") {
                  alert("该用户不存在");
                  resolve({
                    author_name: null,
                    post_text: null,
                    like_num: null
                  });
              } else {
                  const postInfo = res.data;
                  resolve({
                    author_name: postInfo.author_name,
                    post_text: postInfo.post_text,
                    like_num: postInfo.like_num
                  });
              }
          })
          .catch(e => {
              alert("404 handleLoadPostString响应失败: " + e.message);
              resolve({
                author_name: null,
                post_text: null,
                like_num: null
              });
          });
      });
    };

    min(a, b) {
      return a < b ? a : b;
    }

    loadPostData = async (currentPage, select_Bar_State, Search_String) => {

      const totalNumber = await this.handleLoadPostNumber(Search_String)
      this.setState({totalPostNumber: totalNumber})

      let postNumber =  totalNumber - ((currentPage - 1) * 6);
      postNumber = await this.min(postNumber, 6)

      for(let i = 1; i <= postNumber; i++) {
        const userInfo = await this.handleLoadPostString(currentPage, select_Bar_State, Search_String,i)
        const avatarInfo = await this.handleLoadPostAvatar(currentPage, select_Bar_State, Search_String,i)
        const pictureInfo = await this.handleLoadPostPicture(currentPage, select_Bar_State, Search_String,i)

        this.setState((prevState) => {
          const newItems = [...prevState.items, {avatar: avatarInfo, user: userInfo.author_name, text: userInfo.post_text, thumb: userInfo.like_num, img: pictureInfo}]
          this.setState({items: newItems})
        })
      }
      return 

    }

    componentDidMount(){
      if(!this.state.isMounted){
        this.setState(() => ({
          items: [], isMounted: true,
        }),()=>{
          this.loadPostData(this.state.currentPage, this.props.select_Bar_State, this.props.Search_String)
        })
      }
    }

    componentDidUpdate(prevProps){
      if(this.props.select_Bar_State != prevProps.select_Bar_State || this.props.Search_String != prevProps.Search_String){
        this.setState(() => ({
          items: []
        }),()=>{
          this.loadPostData(this.state.currentPage, this.props.select_Bar_State, this.props.Search_String)
        })
      }
    }

    state = {
      isLoading: false,
      isModalOpen: false,
      isMounted: false,
      isErrorReminderOpen: false,
      errorString: '',
      currentPage: 1,
      totalPostNumber: 9,
      items: [],
    }

    handlePageChange = (newPage) =>{
      this.setState({currentPage: newPage})
      this.setState(() => ({
        items: []
      }),()=>{
        this.loadPostData(this.state.currentPage, this.props.select_Bar_State, this.props.Search_String)
      })
    };

    openErrorReminder = (responseString) => {
      this.setState({ errorString: responseString })
      this.setState({ isErrorReminderOpen: true });
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    closeErrorReminder = () => {
      this.setState({ isErrorReminderOpen: false });
      document.body.style.overflow = 'auto'; // 恢复背景滚动
    }

    openModal = () => {
      this.setState({ isModalOpen: true });
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    };

    closeModal = () => {
      this.setState({ isModalOpen: false });
      document.body.style.overflow = 'auto'; // 恢复背景滚动
    };

    render() {
      const items = this.state.items

      const PaginationStyle = {
          position: 'relative',
          bottom: '0',
          padding: '8px',
        }
  
      return (
        <div>
          {this.state.isLoading && 
          <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999,}}>
            <Spin tip="Loading..." />
          </div>}
          <List class="post-list" style={this.props.Discover_List_Style}
                grid={{ column: 2 }}
                dataSource={items}
                renderItem={(item) => (
                <List.Item key={item.id} onClick={this.openModal} style={{display: 'flex', borderBottom: '1px solid rgba(2, 9, 16, 0.13)', borderRight: '1px solid rgba(2, 9, 16, 0.13)', breakInside: 'avoid'}}>
                    <div style={{ marginTop: '10px', marginLeft: '10px'}}>
                    < img src={item.avatar} alt="Sunset" style={{ width: '80px', height: '80px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ marginLeft: '20px' }}>
                    <h3>{item.user}</h3>
                    <p style={{ marginTop: '-5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px'}}>{item.text}</p>
                    <img src={item.img} alt="Sunset" style={{height: '250px', width: '300px'}} />
                    </div>
                </div>
                <div style={{ marginTop: '50px'}}>
                    <label style={{border: 'none', background: 'none', marginLeft:'45px'}}>
                      <img src="/picture/Compliments.png" alt="Like" style={{width: '24px', height: '24px' }} />
                    </label>
                    <p style={{marginLeft:'80px', marginTop:'-25px'}}>{item.thumb}</p>
                </div>
                </List.Item>
                )}>
                <div style={PaginationStyle} >
                  <Pagination current={this.state.currentPage} pageSize={6} total={this.state.totalPostNumber} onChange={this.handlePageChange}/>
                </div> 
            </List>
            <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} />
            <ErrorReminder isOpen={this.state.isErrorReminderOpen} onClose={this.closeErrorReminder} errorString={this.state.errorString}/>
        </div>
      );
    }
  }
  
  export default DiscoverList;