import { Navbar } from '../components/Navbar';
import { DiaryForm } from '../components/DiaryForm';
import { DiaryList } from '../components/DiaryList';

export default function DiaryDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <DiaryForm />
        <div className="mt-8">
          <DiaryList />
        </div>
      </main>
    </div>
  );
}