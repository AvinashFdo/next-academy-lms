export default function PageShell({ title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}