public with sharing class TransactionController {
    
    @AuraEnabled
    public static String createTransaction(Map<String, Object> details) {
        try {
            Transaction__c tnx = new Transaction__c();
            tnx.Show_Time__c = (String) details.get('ShowTime');
            tnx.Patron_Name__c = (String) details.get('PatronName'); 
            tnx.Number_of_Tickets__c = (Decimal) details.get('NumberOfTickets');
            tnx.Email_for_Communication__c = (String) details.get('Email');
            tnx.Mobile_Number__c = (String) details.get('PhoneNumber');
            
            insert tnx;

            return 'Transaction created successfully';
        } catch (DmlException e) {
            return 'Error creating transaction: ' + e.getMessage();
        } catch (Exception e) {
            return 'Unexpected error: ' + e.getMessage();
        }
    }
}