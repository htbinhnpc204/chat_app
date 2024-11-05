package com.personal.chatapp.service.dto;

import com.personal.chatapp.domain.Room;
import com.personal.chatapp.domain.RoomMember;
import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Data;

@Data
public class RoomDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    private String name;
    private String description;
    private Set<UserDTO> members;
    private String createdBy;
    private Instant createdDate;
    private String lastModifiedBy;
    private Instant lastModifiedDate;

    public RoomDTO() {}

    public RoomDTO(Room room) {
        this.id = room.getId();
        this.name = room.getName();
        this.description = room.getDescription();
        this.members = room.getMembers().stream().map(RoomMember::getUser).map(UserDTO::new).collect(Collectors.toSet());
        this.createdBy = room.getCreatedBy();
        this.createdDate = room.getCreatedDate();
        this.lastModifiedBy = room.getLastModifiedBy();
        this.lastModifiedDate = room.getLastModifiedDate();
    }
}
