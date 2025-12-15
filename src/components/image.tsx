export const Image = ({ src }: { src: string }) => {
  return <img src={`${import.meta.env.VITE_API_URL}${src}`} />
}
