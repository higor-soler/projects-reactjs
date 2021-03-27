import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../Button';
import { TextInput } from '../TextInput';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(() => {
    console.log(new Date().toLocaleString('pt-br'));
    handleLoadPosts(0, postsPerPage);
  },[handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    
    setSearchValue(value);
  }

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <h1>Search value: { searchValue}</h1>
        )}

        <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts com a pesquisa: <strong>{searchValue}</strong>. =(</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}

/* >>> Home React sem Hooks <<< */
// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 15,
//     searchValue: ''
//   };

//   async componentDidMount() {
//     await this.lodaPosts();
//   }

//   lodaPosts = async () => {
//     const { page, postsPerPage } = this.state;

//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     })
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   }

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({searchValue: value });
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue ? 
//       allPosts.filter(post=>{
//         return post.title.toLowerCase().includes(
//           searchValue.toLowerCase()
//         );
//       })
//     : posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && (
//               <h1>Search value: { searchValue }</h1>
//           )}

//           <TextInput 
//           searchValue={searchValue}
//           handleChange={this.handleChange}
//           />
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não existem posts com a pesquisa: <strong>{ searchValue }</strong>. =(</p>
//         )}

//         <div className="button-container">
//           {!searchValue && (
//             <Button
//             text="Load more posts"
//             onClick={this.loadMorePosts}
//             disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }



/* >>> States, Arrays Lifecycle Methods <<< */
// import './App.css';
// import { Component } from 'react';

// class App extends Component {
//   state = {
//     counter: 0,
//     posts: [
//       {
//         id: 1,
//         title: 'O Título 1',
//         body: 'O Corpo 1'
//       },
//       {
//         id: 2,
//         title: 'O Título 2',
//         body: 'O Corpo 2'
//       },
//       {
//         id: 3,
//         title: 'O Título 3',
//         body: 'O Corpo 3'
//       },
//     ]
//   };
//   timeoutUpdate = null;

//   componentDidMount() {
//     this.handleTimeout();
//   }

//   componentDidUpdate() {
//     this.handleTimeout();
//   }

//   componentWillUnmount() {
//     clearTimeout(this.timeoutUpdate);
//   }

//   handleTimeout = () => {
//     const { posts, counter } = this.state;
//     posts[0].title = 'O Título mudou';

//     this.timeoutUpdate = setTimeout(() => {
//       this.setState({ posts, counter: counter + 1 });
//     }, 1000);
//   }

//   render() {
//     const { posts, counter } = this.state;

//     return (
//       <div className="App">
//         <p>{ counter }</p>
//         { posts.map(post => (
//           <div key={post.id}>
//             <h1>{post.title}</h1>
//             <p>{post.body}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }
// export default App;


/* >>> Componentes Funcionais e de Classe <<< */
// import logo from './logo.svg';
// import './App.css';
// import { Component } from 'react';
// class App extends Component {
//   state = {
//       name: 'Higor Soler',
//       counter: 0
//     };

//   handlePClick = () => {
//     this.setState({ name: 'Júnior' });
//   }

//   handleAClick = (event) => {
//     event.preventDefault();
//     const { counter } = this.state;
//     this.setState({ counter: counter + 1 });
//   }

//   render() {
//     const { name, counter } = this.state;

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p onClick={this.handlePClick}>
//             {name} {counter}
//           </p>
//           <a
//             onClick={this.handleAClick}
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Este é o link
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// import logo from './logo.svg';
// import './App.css';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
