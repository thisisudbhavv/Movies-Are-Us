public with sharing class TransactionController {
    
    @AuraEnabled
    public static void createTransaction(Map<String, Object> details)
    {
        Transaction__c tnx = new Transaction__c();
        tnx.Show_Time__c = (String) details.get('ShowTime');
        tnx.Patron_Name__c = (String) details.get('PatronName'); 
        tnx.Number_of_Tickets__c = (Decimal) details.get('NumberOfTickets');
        tnx.Email_for_Communication__c = (String) details.get('Email');
        tnx.Mobile_Number__c = (String) details.get('PhoneNumber');


        insert tnx;
    }
}