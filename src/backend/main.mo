actor {
  var visitCount = 0;

  public shared ({ caller }) func incrementVisitCount() : async Nat {
    visitCount += 1;
    visitCount;
  };

  public query ({ caller }) func getVisitCount() : async Nat {
    visitCount;
  };
};
