package julien.maillard.repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.amazonaws.services.dynamodbv2.model.ScanResult;

import julien.maillard.entity.Visitor;

@Repository
public class VisitorRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    private AmazonDynamoDB amazonDynamoDB;

    public void registerVisitor(Visitor visitor) {
        dynamoDBMapper.save(visitor);
    }

    public int countVisitorsByAttribute(String attributeName, String attributeValue) {
        Map<String, AttributeValue> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":val", new AttributeValue().withS(attributeValue));

        ScanRequest scanRequest = new ScanRequest()
                .withTableName("visitor")
                .withFilterExpression(attributeName + " = :val")
                .withExpressionAttributeValues(expressionAttributeValues);

        ScanResult result = amazonDynamoDB.scan(scanRequest);
        return result.getCount();
    }

    public int countVisitorsByMonth(String attributeName, String attributeValue, int month, int year) {
        LocalDateTime startDateTime = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endDateTime = startDateTime.plusMonths(1).minusSeconds(1);

        Instant startInstant = startDateTime.atZone(ZoneId.of("UTC")).toInstant();
        Instant endInstant = endDateTime.atZone(ZoneId.of("UTC")).toInstant();

        Map<String, AttributeValue> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":startDate", new AttributeValue().withS(startInstant.toString()));
        expressionAttributeValues.put(":endDate", new AttributeValue().withS(endInstant.toString()));
        expressionAttributeValues.put(":val", new AttributeValue().withS(attributeValue));

        String filterExpression = "visitDateTime between :startDate and :endDate AND " + attributeName + " = :val";

        ScanRequest scanRequest = new ScanRequest()
                .withTableName("visitor")
                .withFilterExpression(filterExpression)
                .withExpressionAttributeValues(expressionAttributeValues);

        ScanResult result = amazonDynamoDB.scan(scanRequest);
        return result.getCount();
    }

}