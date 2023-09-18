// eslint-disable-next-line react/prop-types
export const Filter = ({setFilterByName}) => {
  return (
    <>
            <input type="text" onChange={(e) => setFilterByName(e.target.value)}/>
    </>
  )
}