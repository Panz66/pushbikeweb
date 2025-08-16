import ResultList from './ResultList';

export default function User(){
    return(
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Manajemen Hasil</h1>
      <ResultList />
    </div>

    )
}