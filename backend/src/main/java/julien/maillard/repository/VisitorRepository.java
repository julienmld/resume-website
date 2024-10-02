package julien.maillard.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import julien.maillard.entity.Visitor;

@Repository
public class VisitorRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public void registerVisitor(Visitor visitor) {
        dynamoDBMapper.save(visitor);
    }
}
