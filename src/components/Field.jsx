
function Field({ title, type }) {
  return (
    <div className="pb-4">
        <h2 className="pb-2">{title}</h2>
        <input className="w-full p-2 " type={type} />
    </div>
  )
}

export default Field