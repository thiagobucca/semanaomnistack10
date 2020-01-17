import React, { useState, useEffect} from "react";

export default function DevForm({ onSubmit}) {

    const [github_username, setGithubUsername] = useState("");
    const [techs, setTechs] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            console.log(position);
          },
          err => {
            console.log(err);
          },
          {
            timeout: 30000
          }
        );
      }, []);


     async function handleAddDev(e){
         e.preventDefault();
         await onSubmit({
             github_username,
             techs,
             latitude,
             longitude
         });

         setGithubUsername("");
         setTechs("");
      }

  return (
    <form onSubmit={handleAddDev}>
      <div className="input-block">
        <label htmlFor="">Usuário Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
        ></input>
      </div>
      <div className="input-block">
        <label htmlFor="">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        ></input>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="">Latitude</label>
          <input
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            type="number"
            required
          ></input>
        </div>
        <div className="input-block">
          <label htmlFor="">Longitude</label>
          <input
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            type="number"
            required
          ></input>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
