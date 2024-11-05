package com.personal.chatapp.repository;

import com.personal.chatapp.domain.RoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomMemberRepository extends JpaRepository<RoomMember, Long> {}
