export default async function Read(props){

    const data = await fetch(`http://localhost:9999/topics/${props.params.id}`, {cache:'no-store'});
    const topics = await data.json();

    return (
        <>
        <h2>{topics.title}</h2>
        <div>
        {topics.body}
        </div>
        
        </>
        
    )
}