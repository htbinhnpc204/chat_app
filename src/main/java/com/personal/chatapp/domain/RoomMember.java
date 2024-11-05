package com.personal.chatapp.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "room_member")
public class RoomMember {

    @EmbeddedId
    private RoomMemberId id;

    @ManyToOne
    @MapsId("roomId")
    private Room room;

    @ManyToOne
    @MapsId("userId")
    private User user;
}
