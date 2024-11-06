package com.personal.chatapp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Entity
@Data
@Table(name = "rooms")
public class Room extends AbstractAuditingEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @ManyToMany
    @JoinTable(
        name = "room_member",
        joinColumns = { @JoinColumn(name = "room_id", referencedColumnName = "id") },
        inverseJoinColumns = { @JoinColumn(name = "user_id", referencedColumnName = "id") }
    )
    private Set<User> members = new HashSet<>();

    @Override
    public Long getId() {
        return this.id;
    }
}
