import RoomCard from "./RoomCard";

export default function RoomList() {
  const rooms = [
    {
      id: 1,
      language: "English + Spanish",
      level: "Intermediate",
      topic: "Daily Life & Culture",
      active: true,
      participants: [
        { name: "Carlos Mendoza", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Maria López", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      ],
      likes: 32,
    },
    {
      id: 2,
      language: "English + Hindi",
      level: "Beginner",
      topic: "Movies & Entertainment",
      active: true,
      participants: [
        { name: "Pedro Salas", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
        { name: "Sofia Alvarez", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
      ],
      likes: 47,
    },
    {
      id: 3,
      language: "English + Chinese",
      level: "Elementary",
      topic: "Travel Stories",
      active: true,
      participants: [
        { name: "Jorge Fuentes", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
      ],
      likes: 18,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-14 justify-items-center w-full">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
