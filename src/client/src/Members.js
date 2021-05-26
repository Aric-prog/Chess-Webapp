
const Members = (props) => {

    const members = props.members;

    return (
        <div className="member-outer">
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