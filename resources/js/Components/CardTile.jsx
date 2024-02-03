export default function CardTile({ title, subtitle, action }) {
    return (
        <div className="flex justify-between items-center py-4">
            <div className="">
                <h1 className="text-sm">{title}</h1>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
            {action}
        </div>
    );
}
