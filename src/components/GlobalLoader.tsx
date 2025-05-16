export default function GlobalLoader({ loading = true } : { loading? : boolean }) {
  return (
    <div className={`globalLoader ${loading ? 'block' : 'hidden'}`}></div>
  );
}