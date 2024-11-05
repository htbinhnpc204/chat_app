package com.personal.chatapp.web.rest;

import com.personal.chatapp.domain.Room;
import com.personal.chatapp.service.RoomService;
import com.personal.chatapp.service.dto.RoomDTO;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
public class RoomResource {

    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(Arrays.asList("id", "name", "description"));

    private final RoomService roomService;

    public RoomResource(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAllRooms(@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(roomService.getAllRooms(pageable).getContent());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_MODERATOR', 'ROLE_ADMIN')")
    public ResponseEntity<Room> createRoom(@RequestBody RoomDTO dto) throws URISyntaxException {
        Room result = roomService.createRoom(dto);
        return ResponseEntity.created(new URI("/api/rooms/" + result.getId())).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getRoom(@PathVariable Long id) {
        return roomService.getRoom(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_MODERATOR', 'ROLE_ADMIN')")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody RoomDTO dto) {
        return roomService.updateRoom(id, dto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_MODERATOR', 'ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{roomId}/members/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_MODERATOR', 'ROLE_ADMIN')")
    public ResponseEntity<Void> addMember(@PathVariable Long roomId, @PathVariable Long userId) {
        roomService.addMember(roomId, userId);
        return ResponseEntity.noContent().build();
    }
}
