export default function Loading() {
  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
        <p className="mt-4 text-secondary-600">Loading page...</p>
      </div>
    </div>
  );
}
