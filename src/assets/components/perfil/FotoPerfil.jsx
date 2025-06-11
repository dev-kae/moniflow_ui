import { Pencil } from 'lucide-react';

export const FotoPerfil = ({ foto, setFoto, editando, fileInputRef }) => (
  <div className="flex justify-center mb-6">
    <div className="relative w-fit">
      <img
        src={foto || 'https://i.pravatar.cc/96'}
        alt="Foto do usuário"
        className="w-24 h-24 rounded-full object-cover"
      />
      {editando && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Pencil className="text-white" size={20} />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setFoto(URL.createObjectURL(file));
        }}
        className="hidden"
      />
    </div>
  </div>
);