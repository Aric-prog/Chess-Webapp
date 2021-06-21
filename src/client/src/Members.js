
const Members = (props) => {

    // the members array of objects passed on from the parent component using props(about.js)
    const members = props.members;

    return (
        <div className="member-outer">
            {/* using the map function, we iterate though the members array and generate the html elements below for each member */}
            {members.map((member) => (
                <div className="member">
                    <div className="image-cropper">
                        <img src={member.image} alt="member" className="member-img" />
                    </div>
                    <h2>{member.name}</h2>
                    <p>{member.desc}</p>
                </div>
            ))}

        </div>
    );
}

export default Members;