export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
        <p className="text-gray-700 mt-4">You do not have access to this page.</p>
      </div>
    </div>
  );
}
