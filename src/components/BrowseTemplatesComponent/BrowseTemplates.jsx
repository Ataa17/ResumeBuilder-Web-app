import React, { useState, useEffect } from "react";

function Template({ thumbnail }) {
  return (
    <div className="card">
      <img src={thumbnail} alt="thumb" />
    </div>
  );
}

function BrowseTemplates() {
  const [thumbnailsData, setThumbnailsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const namesResponse = await fetch('http://localhost:8000/template/names');
        const names = await namesResponse.json();
        console.log(names);

        const thumbnailsData = [];

        for (const n of names) {
          try {
            const thumbResponse = await fetch(`http://localhost:8000/template/thumb/${n}`);
            const thumbData = await thumbResponse.json();
            thumbnailsData.push(thumbData);
          } catch (err) {
            console.error(err);
          }
        }

        setThumbnailsData(thumbnailsData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []); 
  console.log(thumbnailsData)
  return (
    <div>
      {thumbnailsData.map((t) => (
        <Template key={t.id} thumbnail={t} />
      ))}
    </div>
  );
}

export default BrowseTemplates;
