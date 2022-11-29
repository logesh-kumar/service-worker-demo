import "./App.css";
import { useQuery } from "@tanstack/react-query";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;  
}

function App() {
  const { isLoading, error, data } = useQuery<
    Array<Post>,
    { message: string }
  >({
    queryKey: ["photos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <p>{`An error has occurred: ${error.message}`}</p>;

  return (
    <div className="App">
      {data.map((photo) => (
        <div key={photo.id}>
          <h1>{photo.title}</h1>          
        </div>
      ))}
    </div>
  );
}

export default App;
