package com.tietoevry.moon.subject;

import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject,Long> {
    public List<Subject> findAllByClassroom(Classroom classroom);
}
