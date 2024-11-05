package com.personal.chatapp.service;

import com.personal.chatapp.domain.Room;
import com.personal.chatapp.domain.RoomMember;
import com.personal.chatapp.domain.User;
import com.personal.chatapp.repository.RoomRepository;
import com.personal.chatapp.repository.UserRepository;
import com.personal.chatapp.service.dto.RoomDTO;
import java.time.Instant;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public RoomService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    // Get all rooms
    public Page<RoomDTO> getAllRooms(Pageable pageable) {
        return roomRepository.findAll(pageable).map(RoomDTO::new);
    }

    // Get a room by id
    public Optional<RoomDTO> getRoom(Long id) {
        return roomRepository.findById(id).map(RoomDTO::new);
    }

    public Room createRoom(RoomDTO dto) {
        Room room = new Room();
        room.setName(dto.getName());
        room.setDescription(dto.getDescription());
        room.setCreatedDate(Instant.now());
        return roomRepository.save(room);
    }

    public Optional<Room> updateRoom(Long id, RoomDTO dto) {
        return roomRepository
            .findById(id)
            .map(room -> {
                room.setName(dto.getName());
                room.setDescription(dto.getDescription());
                return roomRepository.save(room);
            });
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public void addMember(Long roomId, Long userId) {
        Room room = roomRepository.findById(roomId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        RoomMember roomMember = new RoomMember();
        roomMember.setRoom(room);
        roomMember.setUser(user);
        room.getMembers().add(roomMember);
        roomRepository.save(room);
    }
}
