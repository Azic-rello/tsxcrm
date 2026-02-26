import {GroupAdd, GroupDel, GroupEdit} from '../../';

export default function Group() {
  return (
    <div className="min-h-screen bg-[#0a1929] text-white p-6 md:p-10">
      <h1 className="text-center text-4xl md:text-5xl font-bold mb-12 tracking-tight">
        Group Panel
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        <GroupAdd />
        <GroupEdit />
        <GroupDel />
      </div>
    </div>
  );
}