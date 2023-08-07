'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(){

    const params = useParams();
    const id = params.id;
    const [title,setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`).then((res)=>{
            return res.json()
        }).then((result)=>{
            setTitle(result.title);
            setBody(result.body);
        })
    },[id])


    return (
        <form onSubmit={(e)=>{
            e.preventDefault();

            const title = e.target.title.value;
            const body = e.target.body.value;
            const option = {
                method : "PUT",
                headers :  {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({title,body})
            }

            fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`,option).then((res)=>{
                return res.json();
            }).then((result)=>{
                const lastId = result.id;

                router.push(`/read/${lastId}`);
                router.refresh();
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={(e)=>{
                    setTitle(e.target.value);
                }} />
            </p>
            <p>
                <textarea name="body" placeholder="body" value={body} onChange={(e)=>{
                    setBody(e.target.value)
                }}></textarea>
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    )
}